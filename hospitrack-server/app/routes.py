from app import app
from app.utils.data_utils import set_default_values
from app.controllers.router_scans import RouterScansController
from app.controllers.labeled_router_scans import LabeledRouterScansController
from app.utils.predict import predict
from flask import request, jsonify


@app.route('/api/test')
def test():
    return jsonify(success=True)


@app.route('/api/insert-router-scan', methods=['POST', 'GET'])
def insert_router_scan():
    """
    inserts a new router scan from a device into the database.
    gets the data from the request's payload from the client.
    :return: http response
    """
    data = request.json
    print(data)
    if 'room_id' in data or 'roomId' in data:
        data['room_id'] = data['roomId'] if 'roomId' in data else data['room_id']
    # TODO: shouldn't recieve roomId (only room_id) - delete the line above when it does

    set_default_values(data=data,
                      hospital_id='experiment',
                      longitude=None,
                      latitude=None,
                      accuracy=None,
                      altitude=None,
                      room_id=None)
    # TODO: client should always send hospital_id - when it does, delete it from line above


    if data['room_id']:
        # if the data has a room_id -> insert it into the labeled table (for model training)
        new_labeled_router_scan = LabeledRouterScansController(imei=data['imei'],
                                                    timestamp=data['timestamp'],
                                                    longitude=data['longitude'],
                                                    latitude=data['latitude'],
                                                    altitude=data['altitude'],
                                                    accuracy=data['accuracy'],
                                                    hospital_id=data['hospital_id'],
                                                    room_id=data['room_id'],
                                                    rssi_by_bssid=data['rssi_by_bssid'])
        new_labeled_router_scan.insert()

    else:
        # if the data has a null room_id -> insert it into the unlabeled table (for predictions)
        predicted_room_id = predict(data['hospital_id'], data['rssi_by_bssid'])

        new_router_scan = RouterScansController(imei=data['imei'],
                                                timestamp=data['timestamp'],
                                                longitude=data['longitude'],
                                                latitude=data['latitude'],
                                                altitude=data['altitude'],
                                                accuracy=data['accuracy'],
                                                hospital_id=data['hospital_id'],
                                                rssi_by_bssid=data['rssi_by_bssid'])
        new_router_scan.insert()
        return "predicted room: " + str(predicted_room_id)

    resp = jsonify(success=True)
    resp.status_code = 200
    return resp

