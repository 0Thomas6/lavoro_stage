import logging
from turtle import update

from src.Config import Environment
import pymysql
import json
import datetime
from datetime import timezone

project_env = Environment()
project_env = project_env.get_env()
user = project_env['user']
password = project_env['password']
db = project_env['db_name']
host = project_env['host']
db_port = project_env['db_port']

con = pymysql.connect(host=host,
                      user=user,
                      password=password,
                      database=db)


class DataArtico:
    def __init__(self):
        self.artico_db = 'art_ico'

    def get_artico(self):
        ok = True
        try:
            with con.cursor() as cur:
                query = "SELECT * " \
                        "FROM " + self.artico_db
                cur.execute(query)
                rows = cur.fetchall()
                artico_data_res = []

                if rows is not None:
                    for row in rows:
                        artico_data = {}
                        artico_data['record_id'] = row[0]
                        artico_data['armod'] = row[1]
                        artico_data['armar'] = row[2]
                        artico_data['arser'] = row[3]
                        artico_data['ardes'] = row[4]
                        artico_data['cdpos'] = row[5]
                        artico_data['arobs'] = row[6]
                        artico_data_res.append(artico_data)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return artico_data_res
        else:
            return False


    def update_artico(self, artico_data):
        ok = True
        try:
            with con.cursor() as cur:
                query = "UPDATE " + self.artico_db + " " \
                        "SET ARMOD = '" + artico_data['armod'] + "', " \
                            "ARMAR = '" + artico_data['armar'] + "', " \
                            "ARSER = '" + artico_data['arser'] + "', " \
                            "ARDES = '" + artico_data['ardes'] + "', " \
                            "CDPOS = " + str(artico_data['cdpos']) + ", " \
                            "AROBS = " + str(artico_data['arobs']) + " " \
                        "WHERE RECORD_ID = " + str(artico_data['record_id'])

                cur.execute(query)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return True
        else:
            return False


    def add_artico(self, artico_data):
        ok = True
        try:
            with con.cursor() as cur:
                query = "INSERT INTO " + self.artico_db + " ( ARMOD, ARMAR, ARSER, ARDES, CDPOS ) " \
                        "VALUES ( '" + artico_data['armod'] + "', '" + artico_data['armar'] + "', '" \
                                    + artico_data['arser'] + "', '" + artico_data['ardes'] + "', " \
                                    + str(artico_data['cdpos']) + " )"

                cur.execute(query)
        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return True
        else:
            return False



    def toggle_delete_artico(self,artico_data):
        ok = True
        try:
            with con.cursor() as cur:
                query = "UPDATE " + self.artico_db + " " \
                        "SET AROBS = " + str(artico_data['arobs']) + " " \
                        "WHERE RECORD_ID = " + str(artico_data['record_id'])
                cur.execute(query)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return True
        else:
            return False



class DataPoszio:
    def __init__(self):
        self.poszio_db = 'pos_zio'

    def get_poszio(self):
        ok = True
        try:
            with con.cursor() as cur:
                query = "SELECT * " \
                        "FROM " + self.poszio_db
                cur.execute(query)
                rows = cur.fetchall()
                poszio_data_res = []

                if rows is not None:
                    for row in rows:
                        poszio_data = {}
                        poszio_data['record_id'] = row[0]
                        poszio_data['pscap'] = row[1]
                        poszio_data['pspia'] = row[2]
                        poszio_data['psuff'] = row[3]
                        poszio_data['psnum'] = row[4]
                        poszio_data['cdmat'] = row[5]
                        poszio_data['psobs'] = row[6]
                        poszio_data_res.append(poszio_data)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return poszio_data_res
        else:
            return False


class DataDipend:
    def __init__(self):
        self.dipend_db = 'dip_end'

    def get_dipend(self):
        ok = True
        try:
            with con.cursor() as cur:
                query = "SELECT * " \
                        "FROM " + self.dipend_db
                cur.execute(query)
                rows = cur.fetchall()
                dipend_data_res = []

                if rows is not None:
                    for row in rows:
                        dipend_data = {}
                        dipend_data['record_id'] = row[0]
                        dipend_data['dpmat'] = row[1]
                        dipend_data['dpnom'] = row[2]
                        dipend_data['dpcog'] = row[3]
                        dipend_data['dprep'] = row[4]
                        dipend_data['dpobs'] = row[5]
                        dipend_data_res.append(dipend_data)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
            return dipend_data_res
        else:
            return False


class DataRepart:
    def __init__(self):
        self.repart_db = 'rep_art'

    def get_repart(self):
        ok = True
        try:
            with con.cursor() as cur:
                query = "SELECT * " \
                        "FROM " + self.repart_db
                cur.execute(query)
                rows = cur.fetchall()
                repart_data_res = []

                if rows is not None:
                    for row in rows:
                        repart_data = {}
                        repart_data['record_id'] = row[0]
                        repart_data['cdrep'] = row[1]
                        repart_data['rpdes'] = row[2]
                        repart_data['rpobs'] = row[3]
                        repart_data_res.append(repart_data)

        except Exception as e:
            logging.error(e)
            ok = False

        if ok:
             return repart_data_res
        else:
             return False






