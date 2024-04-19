import React, { Component, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Navigate } from "react-router-dom";

export default class TotalBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      sukses: false,
    };
  }
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        this.setState({ sukses: true });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  render() {
    let { sukses, error } = this.state;
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-2 mt-2 mr-2"
                size="lg"
                style={{ width: "100%" }}
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                <strong className="ml-2">Bayar</strong>
              </Button>
              {sukses && <Navigate to="/sukses" replace={true} />}
              {error && alert("Maaf, ada masalah dengan server")}
            </Col>
          </Row>
        </div>

        {/* mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-2 mt-2 mr-2"
                size="lg"
                style={{ width: "100%" }}
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                <strong className="ml-2">Bayar</strong>
              </Button>
              {sukses && <Navigate to="/sukses" replace={true} />}
              {error && alert("Maaf, ada masalah dengan server")}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
