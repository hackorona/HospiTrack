from app.models.router_scans import RouterScans
from app.controllers import session

class RouterScansController(RouterScans):

    def insert(self):
        session.add(self)
        session.commit()

    @staticmethod
    def select_all_rows():
        return session.query(RouterScans).all()
