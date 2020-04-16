from app.controllers import session

class BaseController(object):

    def insert(self):
        session.add(self)
        session.commit()

    @staticmethod
    def insert_many(li):
        iters = (len(li) // 500) + 1
        for i in range(iters):
            for el in li[i * 500: (i + 1) * 500]:
                session.add(el)
                session.flush()
            session.commit()
            print(f'inserted {(i + 1) * 500} rows')