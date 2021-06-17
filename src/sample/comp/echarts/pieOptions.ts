export default {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { value: 500, name: '电子产品' },
        { value: 310, name: '服装' },
        { value: 274, name: '化妆品' },
        { value: 400, name: '家居' }
      ].sort(function (a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 400
      }
    }
  ]
}
