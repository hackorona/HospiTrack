from app.models.demo_router_scans import DemoRouterScans
from app.controllers.base_controller import BaseController
from app.controllers import session

class DemoRouterScansController(DemoRouterScans, BaseController):

    @staticmethod
    def select_all_rows():
        return session.query(DemoRouterScans).all()
