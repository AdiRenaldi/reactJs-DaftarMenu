import React, { Component } from "react";
import { Col, ListGroup, Row, Badge, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";
import axios from "axios";

export default class Hasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keranjangDetai: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetai: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetai.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetai.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHendler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  hendlerSubmit = (event) => {
    event.preventDefault();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetai.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjang/" + this.state.keranjangDetai.id, data)
      .then((res) => {
        this.props.getListKeranjangs();
        swal({
          title: "Update Pesanan",
          text: data.product.name,
          icon: "success",
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hapusPesanan = (value) => {
    axios
      .delete(API_URL + "keranjang/" + value)
      .then((res) => {
        this.setState({
          showModal: false,
        });
        this.props.getListKeranjangs();
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4 className="text-center">
          <strong>Pesanan Anda</strong>
          <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
        </h4>
        <hr />

        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs &&
              keranjangs.map((keranjang) => (
                <ListGroup.Item
                  key={keranjang.id}
                  onClick={() => this.handleShow(keranjang)}
                >
                  <Row style={{ cursor: "pointer" }}>
                    <Col xs={2}>
                      <h4>
                        <Badge pill bg="success" style={{ color: "white" }}>
                          {keranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{keranjang.product.name}</h5>
                      <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(keranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
        <ModalKeranjang
          handleClose={this.handleClose}
          tambah={this.tambah}
          kurang={this.kurang}
          changeHendler={this.changeHendler}
          hendlerSubmit={this.hendlerSubmit}
          hapusPesanan={this.hapusPesanan}
          {...this.state}
        />
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
