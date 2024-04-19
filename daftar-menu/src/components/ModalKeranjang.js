import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetai,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHendler,
  hendlerSubmit,
  totalHarga,
  hapusPesanan,
}) => {
  if (keranjangDetai) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetai.product.name}{" "}
            <strong className="ml-2">
              (Rp. {numberWithCommas(keranjangDetai.product.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={hendlerSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>Rp. {numberWithCommas(totalHarga)}</strong>
              </p>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mr-2 ml-2"
                  onClick={kurang}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong>{jumlah}</strong>
                <Button
                  variant="primary"
                  size="sm"
                  className="ml-2"
                  onClick={tambah}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </p>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                placeholder="Contoh : Pedas, Gurih"
                value={keterangan}
                onChange={(e) => changeHendler(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-2"
              onClick={handleClose}
            >
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="mr-2"
            onClick={() => hapusPesanan(keranjangDetai.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
