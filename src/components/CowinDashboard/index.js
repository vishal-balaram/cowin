// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import './index.css'

class CowinDashboard extends Component {
  state = {data: [], dataReceived: false, isLoading: true}

  componentDidMount = () => {
    this.getVaccinationsData()
  }

  getVaccinationsData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      this.setState({dataReceived: false})
    } else {
      this.setState({dataReceived: true})
    }

    this.setState({isLoading: false})

    const Data = await response.json()

    this.setState({data: Data})
  }

  DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {data, dataReceived, isLoading} = this.state

    return (
      <div className="bg-container">
        <div className="website-logo-para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-image"
          />
          <p className="cowin-para">Co-win</p>
        </div>
        <h1 className="heading">CoWIN vaccination in india</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div>
            {dataReceived ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                  alt="failure view"
                />
                <h1>Something went wrong</h1>
              </div>
            ) : (
              <div>
                <div className="card-vaccination-coverage-container">
                  <h1 className="card-coverage-heading">
                    Vaccination Coverage
                  </h1>
                  <div>
                    <ResponsiveContainer width="100%" height={500}>
                      <BarChart
                        data={data.last_7_days_vaccination}
                        margin={{
                          top: 5,
                        }}
                      >
                        <XAxis
                          dataKey="vaccine_date"
                          tick={{
                            stroke: 'gray',
                            strokeWidth: 1,
                          }}
                        />
                        <YAxis
                          tick={{
                            stroke: 'gray',
                            strokeWidth: 0,
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            padding: 30,
                          }}
                        />
                        <Bar
                          dataKey="dose_1"
                          name="Dose 1"
                          fill="#2d87bb"
                          barSize="20%"
                        />
                        <Bar
                          dataKey="dose_2"
                          name="Dose 2"
                          fill="#f54394"
                          barSize="20%"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="card-gender-container">
                  <h1 className="card-coverage-heading">
                    Vaccination by gender
                  </h1>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        cx="70%"
                        cy="40%"
                        data={data.vaccination_by_gender}
                        startAngle={0}
                        endAngle={180}
                        innerRadius="40%"
                        outerRadius="70%"
                        dataKey="count"
                      >
                        <Cell name="Male" fill="#f54394" />
                        <Cell name="Female" fill="#2d87bb" />
                        <Cell name="Others" fill="#2cc6c6" />
                      </Pie>
                      <Legend
                        iconType="circle"
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-age-container">
                  <h1 className="card-coverage-heading">Vaccination by Age</h1>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        cx="70%"
                        cy="40%"
                        data={data.vaccination_by_age}
                        startAngle={0}
                        endAngle={360}
                        innerRadius="0%"
                        outerRadius="70%"
                        dataKey="count"
                      >
                        <Cell name="18-44" fill="#2d87bb" />
                        <Cell name="45-60" fill="#a3df9f" />
                        <Cell name="Above 60" fill="#64c2a6" />
                      </Pie>
                      <Legend
                        iconType="circle"
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default CowinDashboard
