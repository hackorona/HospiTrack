from app import Base
from sqlalchemy import Column, String, BigInteger, Float, Integer, JSON
import json

class DemoRouterScans(Base):

    __tablename__ = 'demo_router_scans'
    row_id = Column(Integer, primary_key=True)
    id = Column(String, nullable=False)
    timestamp = Column(BigInteger, nullable=False)
    longitude = Column(Float, nullable=True)
    latitude = Column(Float, nullable=True)
    altitude = Column(Float, nullable=True)
    accuracy = Column(Float, nullable=True)
    rssi_by_bssid = Column(JSON, nullable=False)


    def __init__(self, id, timestamp, longitude, latitude, altitude, accuracy, rssi_by_bssid):
        self.id = id
        self.timestamp = timestamp
        self.longitude = longitude
        self.latitude = latitude
        self.altitude = altitude
        self.accuracy = accuracy
        self.rssi_by_bssid = rssi_by_bssid

        if isinstance(self.rssi_by_bssid, str):
            try:
                self.rssi_by_bssid = json.loads(self.rssi_by_bssid)
            except ValueError:
                print(f"could not convert {rssi_by_bssid} to dict")