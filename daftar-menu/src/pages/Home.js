import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      // pilihCategori: "Makanan",
      keranjangs: [],
      renderAwal: false,
    };
  }

  componentDidMount() {
    this.getSemuaMenu();
    this.getListKeranjangs();
  }

  getSemuaMenu = () => {
    this.setState({
      menus: [],
      renderAwal: true,
    });
    axios
      .get(API_URL + "products")
      .then((res) => {
        const menus = res.data;
        this.setState({
          menus,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getListKeranjangs = () => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      pilihCategori: value,
      menus: [],
      renderAwal: false,
    });

    axios
      .get(API_URL + "products?category.name=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukkanKeranjang = (value) => {
    axios
      .get(API_URL + "keranjang?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjang", keranjang)
            .then((res) => {
              this.getListKeranjangs();
              swal({
                title: "Masuk Keranjang",
                text: keranjang.product.name,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjang/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjangs();
              swal({
                title: "Masuk Keranjang",
                text: keranjang.product.name,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {/* <Card className="overflow-auto"> */}
        <Container fluid className="overflow-auto batas">
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              pilihCategori={this.state.pilihCategori}
              renderAwal={this.state.renderAwal}
              getSemuaMenu={this.getSemuaMenu}
            />
            <Col className="mt-3">
              <h4 className="text-center">
                <strong>Menu Tersedia</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {this.state.menus &&
                  this.state.menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukkanKeranjang={this.masukkanKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={this.state.keranjangs}
              getListKeranjangs={this.getListKeranjangs}
            />
          </Row>
        </Container>
        {/* </Card> */}
      </div>
    );
  }
}
