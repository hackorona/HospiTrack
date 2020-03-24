from app import Base
from sqlalchemy import Column, String, BigInteger, SmallInteger, Float, Integer

class RouterScans(Base):

    __tablename__ = 'router_scans'
    id = Column(Integer, primary_key=True )
    imei = Column(String, nullable=False)
    timestamp = Column(BigInteger, nullable=False)
    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    altitude = Column(Float, nullable=False)
    accuracy = Column(Float, nullable=False)
    rssi = Column(SmallInteger, nullable=False)
    bssid = Column(String, nullable=False)

    def __init__(self, imei, timestamp, longitude, latitude, altitude, accuracy, rssi, bssid):
        self.imei = imei
        self.timestamp = timestamp
        self.longitude = longitude
        self.latitude = latitude
        self.altitude = altitude
        self.accuracy = accuracy
        self.rssi = rssi
        self.bssid = bssid

