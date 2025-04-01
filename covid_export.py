import pandas as pd

# Load data from OWID
url = "https://covid.ourworldindata.org/data/owid-covid-data.csv"
df = pd.read_csv(url)

# Filter for India
india_df = df[df['location'] == 'India']
india_df['date'] = pd.to_datetime(india_df['date'])

# Keep only date & new cases
filtered = india_df[['date', 'new_cases']].dropna()
filtered = filtered.rename(columns={'date': 'Date', 'new_cases': 'NewCases'})

# Export
filtered.to_csv("covid_india.csv", index=False)
print("Exported covid_india.csv")
