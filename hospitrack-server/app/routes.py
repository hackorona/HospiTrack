from app import app, engine
from app.models.router_scans import RouterScans
from sqlalchemy.orm import sessionmaker

import time

Session = sessionmaker(bind=engine)
session = Session()

@app.route('/api/insert-router-scan')
def insert_router_scan():
    """
    inserts a new router scan from a device into the database.
    Should get the data from the request's payload from the client.
    :return:
    """

    # TODO: get data from client's request payload

    mock_data = {'imei': '123456789',
                 'timestamp': int(time.time()),
                 'longitude': 34.53,
                 'latitude': 54.435,
                 'altitude': 1.42,
                 'accuracy': 9.33,
                 'rssi': -70,
                 'bssid': 'rg:3t:4t:9t4i:4t'
                 }
    new_router_scan = RouterScans(imei=mock_data['imei'],
                           timestamp=mock_data['timestamp'],
                           longitude=mock_data['longitude'],
                           latitude=mock_data['latitude'],
                           altitude=mock_data['altitude'],
                           accuracy=mock_data['accuracy'],
                           rssi=mock_data['rssi'],
                           bssid=mock_data['bssid']
                           )
    session.add(new_router_scan)
    session.commit()

    return "successfuly inserted data"
