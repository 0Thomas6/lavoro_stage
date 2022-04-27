import unittest
from Db import *


class MyTestCase(unittest.TestCase):

    def test_something(self):
        artico = DataArtico()
        artico_data = {}
        artico_data['record_id'] = 1
        artico_data['arobs'] = 0
        ris = artico.toggle_delete_artico(artico_data)


        print("risultato: ")
        print(ris)


        poszio = DataPoszio()
        poszio_data = {}
        poszio_data['record_id'] = 1
        poszio_data['psobs'] = 0
        ris = poszio.toggle_delete_poszio(poszio_data)


        print("risultato: ")
        print(ris)



if __name__ == '__main__':
    unittest.main()
