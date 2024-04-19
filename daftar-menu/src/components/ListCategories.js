import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  if (nama === "Semua")
    return <FontAwesomeIcon icon={faList} className="mr-2" />;

  return <FontAwesomeIcon icon={faList} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { changeCategory, pilihCategori, renderAwal, getSemuaMenu } =
      this.props;
    return (
      <Col md={2} className="mt-3">
        <h4 className="text-center">
          <strong>List Menu</strong>
        </h4>
        <hr />

        <ListGroup style={{ cursor: "pointer" }}>
          <ListGroup.Item
            onClick={getSemuaMenu}
            className={renderAwal === true ? "active" : ""}
          >
            <h5>
              <Icon nama="Semua" /> Semua Menu
            </h5>
          </ListGroup.Item>
          {this.state.categories &&
            this.state.categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.name)}
                className={
                  category.name === pilihCategori && !renderAwal ? "active" : ""
                }
              >
                <h5>
                  <Icon nama={category.name} /> {category.name}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
