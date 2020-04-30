import joblib
import numpy as np
import pandas as pd

from app.utils.hospitals_config import HOSPITALS

def preprocess(bssid_by_rssi, model_columns):
    scans_df = pd.DataFrame.from_records(list(pd.Series({'bssid_by_rssi': bssid_by_rssi}))).fillna(-200)
    from_train = list(set(model_columns).difference(scans_df.columns))
    from_test = list(set(model_columns).intersection(scans_df.columns))
    predict_df = pd.concat([scans_df[from_test], pd.DataFrame(columns=from_train)], axis=0).fillna(-200)
    predict_df = predict_df[model_columns]
    return predict_df


def predict(hospital_id, bssid_by_rssi):
    model = joblib.load(r'app/data/model_objects/{0}'.format(HOSPITALS[hospital_id]['model']))
    model_columns = np.load(r'app/data/model_objects/{0}'.format(HOSPITALS[hospital_id]["model_columns"]), allow_pickle=True)
    predict_df = preprocess(bssid_by_rssi, model_columns)
    room_id = model.predict(predict_df)[0]
    return room_id




