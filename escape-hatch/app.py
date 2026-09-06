"""
STREAMLIT ESCAPE HATCH — use only if the topic is genuinely data/ML centric.

Decision rule at T+3: if the topic hands you a dataset and asks for insight
("here is six months of X, find the problem"), Streamlit plus pandas beats
Next.js decisively — you get a working interactive analysis in minutes and you
would spend 40 minutes reproducing a fraction of it in React.

For anything that is a *product* (records, workflows, forms, chat), stay with
the Next.js app. Streamlit looks like Streamlit, which costs you on a judging
criterion where the final product is the top weight.

Run:
    pip install streamlit pandas altair
    streamlit run escape-hatch/app.py

Deploy: share.streamlit.io, connected to this repo. Set the main file path to
escape-hatch/app.py. Do this once during the prep week so the path is proven.
"""

import altair as alt
import pandas as pd
import streamlit as st

st.set_page_config(page_title="Analysis", layout="wide")


@st.cache_data
def load(file) -> pd.DataFrame:
    """Swap this for the real dataset at T+8. Keep the cache decorator."""
    if file is not None:
        return pd.read_csv(file)
    # Placeholder so the app runs before you have data.
    return pd.DataFrame(
        {
            "month": pd.date_range("2026-03-01", periods=7, freq="MS"),
            "raised": [38, 44, 41, 52, 49, 58, 62],
            "closed": [24, 29, 33, 31, 38, 41, 47],
            "depot": ["Leeds", "Rotterdam", "Leeds", "Bristol", "Leeds", "Rotterdam", "Bristol"],
        }
    )


st.title("Operational analysis")
st.caption("Upload the dataset, or explore the sample below.")

uploaded = st.sidebar.file_uploader("Dataset (CSV)", type=["csv"])
df = load(uploaded)

# --- Filters -----------------------------------------------------------------
columns = df.columns.tolist()
category_cols = [c for c in columns if df[c].dtype == "object"]

if category_cols:
    facet = st.sidebar.selectbox("Break down by", category_cols)
    chosen = st.sidebar.multiselect(
        f"Filter {facet}", sorted(df[facet].unique()), default=sorted(df[facet].unique())
    )
    df = df[df[facet].isin(chosen)]
else:
    facet = None

# --- Headline numbers --------------------------------------------------------
numeric_cols = df.select_dtypes("number").columns.tolist()

if numeric_cols:
    tiles = st.columns(min(len(numeric_cols), 4))
    for tile, col in zip(tiles, numeric_cols[:4]):
        total = df[col].sum()
        mean = df[col].mean()
        tile.metric(col.replace("_", " ").title(), f"{total:,.0f}", f"avg {mean:,.1f}")

# --- Chart -------------------------------------------------------------------
st.subheader("Trend")

time_cols = [c for c in columns if "date" in c.lower() or "month" in c.lower()]

if time_cols and numeric_cols:
    x = time_cols[0]
    y = st.selectbox("Measure", numeric_cols)
    chart = (
        alt.Chart(df)
        .mark_area(opacity=0.35, line=True)
        .encode(x=f"{x}:T", y=f"{y}:Q", tooltip=list(df.columns))
        .properties(height=320)
    )
    st.altair_chart(chart, use_container_width=True)
else:
    st.info("No time column detected. Pick columns in the sidebar.")

# --- Table -------------------------------------------------------------------
st.subheader("Records")
st.dataframe(df, use_container_width=True, hide_index=True)

with st.expander("Notes for the demo"):
    st.markdown(
        "Write the three golden-path steps here so the person demoing can read "
        "them off the screen. Same rule as the Next.js app: if it is not one of "
        "the three steps, it does not get built."
    )
