import csv, re
from rapidfuzz import fuzz, process

HUB = "/root/.claude/uploads/ff40fa87-ed41-43cb-bba5-cdf4138ee6ba/1194d74d-hubspotcrmexportsmycompanies20260605.csv"
CUST = "/root/.claude/uploads/ff40fa87-ed41-43cb-bba5-cdf4138ee6ba/3a501ede-Customer_Accounts_for_CRM_Load_021026A.xlsx__CustomerAccounts.csv"

def norm(s):
    s = (s or "").lower().strip()
    s = re.sub(r"[&]", " and ", s)
    s = re.sub(r"\b(inc|incorporated|llc|llp|lp|ltd|co|corp|corporation|company|companies|the|group|holdings|enterprises|services|svc|svcs|intl|international)\b", " ", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

# Load hubspot companies
hub = []
with open(HUB, newline="", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        name = r["Company name"].strip()
        if name:
            hub.append({"id": r["Record ID"].strip(), "name": name, "norm": norm(name)})

# Load customers
cust = []
with open(CUST, newline="", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        name = r["CUSTOMER_NAME"].strip()
        code = r["CUSTOMER_NUMBER"].strip()
        if name:
            cust.append({"code": code, "name": name, "norm": norm(name)})

# Build choices for hub lookup keyed by index
hub_norms = [h["norm"] for h in hub]

THRESHOLD = 85
rows = []
matched_hub = set()
for c in cust:
    if not c["norm"]:
        continue
    res = process.extractOne(c["norm"], hub_norms, scorer=fuzz.token_sort_ratio)
    if res:
        match_str, score, idx = res
        if score >= THRESHOLD:
            h = hub[idx]
            rows.append({
                "Company name": h["name"],
                "Record ID": h["id"],
                "Customer Code": c["code"],
                "Matched Customer Name": c["name"],
                "Score": round(score, 1),
            })
            matched_hub.add(idx)

# flag record IDs that receive more than one customer code
import collections
idcount = collections.Counter(r["Record ID"] for r in rows)
for r in rows:
    r["Multiple Codes?"] = "YES" if idcount[r["Record ID"]] > 1 else ""

# sort alphabetically by company name for a clean import sheet
rows.sort(key=lambda x: x["Company name"].lower())

OUT = "/home/user/Claude/hubspot_customer_code_import.csv"
fields = ["Record ID", "Company name", "Customer Code", "Matched Customer Name", "Match Score", "Multiple Codes?"]
with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    for r in rows:
        w.writerow({
            "Record ID": r["Record ID"],
            "Company name": r["Company name"],
            "Customer Code": r["Customer Code"],
            "Matched Customer Name": r["Matched Customer Name"],
            "Match Score": r["Score"],
            "Multiple Codes?": r["Multiple Codes?"],
        })

print(f"Hub companies: {len(hub)}")
print(f"Customers: {len(cust)}")
print(f"Matches >= {THRESHOLD}: {len(rows)}")
print(f"Unique hub matched: {len(matched_hub)}")
# score distribution
import collections
buckets = collections.Counter()
for r in rows:
    b = int(r["Score"]//5*5)
    buckets[b]+=1
for b in sorted(buckets):
    print(f"  {b}-{b+4}: {buckets[b]}")
print("\nLowest 15 scored matches (review these):")
for r in rows[-15:]:
    print(f'  {r["Score"]}: "{r["Company name"]}" <- "{r["Matched Customer Name"]}" [{r["Customer Code"]}]')
