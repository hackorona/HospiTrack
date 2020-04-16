from app.models.labeled_router_scans import LabeledRouterScans
from app.controllers.base_controller import BaseController
from app.controllers import session

class LabeledRouterScansController(LabeledRouterScans, BaseController):

    @staticmethod
    def select_all_rows():
        return session.query(LabeledRouterScans).all()
