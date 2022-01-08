import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import _ from 'lodash';

export function VotesChart(data) {
  console.log('data', data)
  const colors = ["#82ca9d", "#f9a597", "#807689", "#1b5776", "#f0abcb", "#2ca388"]
  var lines = ''
  let chartData = []
  if (!_.isEmpty(data.choices)) {
    const allChoices = [...data.choices]
    let votesByDate = {};
    let currHighs = {};
    allChoices.forEach(function(value) {
      currHighs[value] = 0.0
    })

    data.votes.forEach(function(item) {
      if (_.has(votesByDate, item.day)) {
        if (_.has(item, 'cum_sum_vp') && _.has(item, 'choice_string')) {
          votesByDate[item.day][item.choice_string] = parseFloat(item.cum_sum_vp)
          currHighs[item.choice_string] = parseFloat(item.cum_sum_vp)
        }
      }
      else {

        votesByDate[item.day] = {}
        allChoices.forEach(function(value) {
          votesByDate[item.day][value] = currHighs[value]
        })
        if (_.has(item, 'cum_sum_vp') && _.has(item, 'choice_string')) {
          votesByDate[item.day][item.choice_string] = parseFloat(item.cum_sum_vp)
          currHighs[item.choice_string] = parseFloat(item.cum_sum_vp)
        }
      }
    })
  for (const [key, value] of Object.entries(votesByDate)) {

    chartData.push({
      name: key,
      ...value
    }) 
  }
  lines = []
  allChoices.forEach(function(item, index) {
    lines.push(<Line type="monotone" dataKey={item} stroke={colors[index]} />)
})

  }
  
  return (
    <LineChart
      width={1000}
      height={600}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines ? lines : ''}
    </LineChart>
  );
}