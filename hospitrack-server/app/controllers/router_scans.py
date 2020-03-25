from app.models.router_scans import RouterScans
from app.controllers.base_controller import BaseController
from app.controllers import session

class RouterScansController(RouterScans, BaseController):

    @staticmethod
    def select_all_rows():
        return session.query(RouterScans).all()
