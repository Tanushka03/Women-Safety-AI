import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib

np.random.seed(42)

rows = []

for _ in range(1000):

    hour = np.random.randint(0,24)
    lighting = np.random.randint(0,2)
    cctv = np.random.randint(0,2)
    crowd = np.random.randint(0,3)
    incidents = np.random.randint(0,21)

    score = (
        100
        - incidents*2
        - (23-hour if hour>18 else 0)
        + lighting*8
        + cctv*8
        + crowd*3
    )

    score=max(40,min(100,score))

    rows.append([hour,lighting,cctv,crowd,incidents,score])

df=pd.DataFrame(rows,columns=[
    "hour",
    "lighting",
    "cctv",
    "crowd",
    "incidents",
    "score"
])

X=df.drop("score",axis=1)
y=df["score"]

model=RandomForestRegressor(n_estimators=120,random_state=42)
model.fit(X,y)

joblib.dump(model,"safety_model.pkl")

print("Model trained successfully.")