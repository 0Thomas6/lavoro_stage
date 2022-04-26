class Environment:
    def __init__(self):
        self._env = {}

    def get_env(self):

        self._env = {
            'user': 'root',
            'password': '',
            'db_name': 'lavoro_stage',
            'db_port': 3306,
            'host': '127.0.0.1',
            'port': 5000
        }

        return self._env
