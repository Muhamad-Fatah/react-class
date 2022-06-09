import React, { Component } from "react";
import { Button, Container, Navbar, Row, Col, Form, Card } from "react-bootstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKaryawan: [],
      edit: false,
      dataPost: {
        nama_karyawan: "",
        jabatan: "",
        tanggal_lahir: "",
        id: 0
      }
    }
    this.reloadData = this.reloadData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // Get database
  reloadData() {
    axios.get(`http://localhost:3004/data-karyawan/`)
      .then(res => {
        this.setState(
          {
            dataKaryawan: res.data,
            edit: false
          }
        )
      })
  }
  componentDidMount() {
    this.reloadData()
  }

  // Delete database
  handleRemove(e) {
    console.log(e.target.value);
    axios.delete(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then(() => {
        this.reloadData()
      })
  }

  // Input database
  handleChange(e) {
    let newdataPost = { ...this.state.dataPost };
    if (this.state.edit === false) {
      newdataPost["id"] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;
    this.setState({ dataPost: newdataPost });
  }

  // Submit database
  handleSubmit() {
    if (this.state.edit === false) {
      axios.post(`http://localhost:3004/data-karyawan/`, this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.handleClear();
        })
    } else {
      axios.put(`http://localhost:3004/data-karyawan/${this.state.dataPost.id}`, this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.handleClear();
        })
    }
  }

  // Clear database
  handleClear() {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["nama_karyawan"] = "";
    newdataPost["jabatan"] = "";
    newdataPost["tanggal_lahir"] = "";
    newdataPost["jenis_kelamin"] = "";
    this.setState({ dataPost: newdataPost })
  }

  // Edit database
  handleEdit(e) {
    axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`, this.state.dataPost)
      .then((res) => {
        this.setState({
          dataPost: res.data,
          edit: true,
        });
      })
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" id="top">
          <Container className="justify-content-center">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://i.pinimg.com/originals/3b/09/76/3b0976144f0b294b30c41a4d4f6fe9c2.jpg"
                width="50"
                height="50"
                className="d-inline-block align-middle"
              />{' '}
              Data Karyawan PT. ADICATS
            </Navbar.Brand>
          </Container>
        </Navbar >

        <Container className="mt-3">
          <Row md={5}>
            <Col md={3}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Karyawan :</Form.Label>
                  <Form.Control id="fokus" value={this.state.dataPost.nama_karyawan} name="nama_karyawan" type="text" placeholder="Masukan Nama Karyawan" onChange={this.handleChange} />
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Jabatan :</Form.Label>
                  <Form.Control value={this.state.dataPost.jabatan} name="jabatan" type="text" placeholder="Masukan Jabatan" onChange={this.handleChange} />
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Jenis Kelamin :</Form.Label>
                  <Form.Control value={this.state.dataPost.jenis_kelamin} name="jenis_kelamin" type="text" placeholder="Masukan Jenis Kelamin" onChange={this.handleChange} />
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir :</Form.Label>
                  <Form.Control value={this.state.dataPost.tanggal_lahir} name="tanggal_lahir" type="date" onChange={this.handleChange} />
                </Form.Group>
              </Form>
            </Col>

            <Col style={{ paddingTop: "5px", width: "10%" }} className="mt-4">
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className="mt-3">
          <Row md={3}>
            {this.state.dataKaryawan.map((dat, index) => {
              return (
                <Col key={index} className="mb-4">
                  <Card border="info" style={{ width: '18rem' }}>
                    <Card.Header>Profil Karyawan</Card.Header>
                    <Card.Body>
                      <Card.Text className="d-grid gap-2">

                        Nama : {dat.nama_karyawan}  <br /><br />
                        Jabatan : {dat.jabatan} <br /><br />
                        Jenis Kelamin : {dat.jenis_kelamin} <br /><br />
                        Tanggal Lahir : {dat.tanggal_lahir} <br /><br />

                        <Button variant="outline-primary" onClick={this.handleEdit} value={dat.id} >
                          <i className="bi bi-pencil"></i> Edit Data
                        </Button>
                        <Button variant="danger" onClick={this.handleRemove} value={dat.id}>
                          <i className="bi bi-trash" ></i> Delete Data
                        </Button>

                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <Button variant="outline-primary" href="#top" id="btn-to-top">
          <i className="bi bi-arrow-up-circle" style={{fontSize:"30px"}}/>
        </Button>
      </div>
    );
  }
}

export default App;