import React, { Component } from "react";
import "./App.css";
import { Card, Col, Row, Layout, Form, Select, Button } from "antd";

const { Content } = Layout;

const { Option } = Select;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: "Salesforce CRM",
      app: "--",
      sum: 0,
      avg: 0,
      count: 0
    };
  }

  handleChange = value => {
    this.setState({
      dropdown: value
    });
  };

  selectApp = () => {
    fetch(`http://localhost:8080/charges/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appName: this.state.dropdown
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          app: data.name,
          sum: data.sum,
          avg: data.round,
          count: data.count
        });
      });
  };

  render() {
    const { app, sum, avg, count } = this.state;
    return (
      <div className="App">
        <Layout>
          <Content style={{ padding: "5%", height: "100vh" }}>
            <Row gutter={16}>
              <Col md={6} offset={6}>
                <Card>
                  <Form>
                    <h1>Select</h1>
                    <Form.Item help="Choose an application from the dropdown above">
                      <Select
                        defaultValue="Salesforce CRM"
                        onChange={this.handleChange}
                      >
                        <Option value="Salesforce CRM">Salesforce CRM</Option>
                        <Option value="Adobe Creative Cloud">
                          Adobe Creative Cloud
                        </Option>
                        <Option value="JIRA">JIRA</Option>
                        <Option value="GitHub">GitHub</Option>
                        <Option value="Sentry">Sentry</Option>
                        <Option value="AWS">AWS</Option>
                        <Option value="Slack">Slack</Option>
                      </Select>
                      <Button type="primary" onClick={this.selectApp}>
                        Select App
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col md={6} style={{ height: "100%" }}>
                <Card style={{ textAlign: "center" }}>
                  <h3>Name</h3>
                  <h1>{app}</h1>
                  <h3>Sum</h3>
                  <h1>{sum}</h1>
                  <h3>Avg</h3>
                  <h1>{avg}</h1>
                  <h3>Count</h3>
                  <h1>{count}</h1>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
