/*
formdiv即代表存放表格的div
dayflow     用户各时间段访问统计表格
userdistribution    用户地区分布表格
 */

var formdiv=document.getElementById('content'); //放表的div
var myChart = echarts.init(formdiv);

function hourVisit(){
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '每时刻平均人流量统计',
            subtext: '苍耳统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'时',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'人次',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "HourVisit",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){
                    names.push(result[i].name);    //挨个取出类别并填入类别数组
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].value);    //挨个取出销量并填入销量数组
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '人次',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })
};
function UserDistribution(){   //用户地区分布
        myChart.clear();
        myChart.setOption({
            title: {
                text: '各地区用户人数统计',
                subtext: '苍耳统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '用户人数',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[]
                },
            ]
        })
        myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

        var names=[];    //类别数组（实际用来盛放X轴坐标值）
        var nums=[];    //销量数组（实际用来盛放Y坐标值）

        $.ajax({
            type : "post",
            async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url : "UserDistribution",    //请求发送到TestServlet处
            data : {},
            dataType : "json",        //返回数据形式为json
            success : function(result) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                if (result) {
                    for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                        nums.push({
                            name : result[i].name,
                            value : result[i].value,
                         });
                    }                  
                    myChart.hideLoading();    //隐藏加载动画
                    myChart.setOption({        //加载数据图表
                        series: [{
                            name:'用户人数',
                            // 根据名字对应到相应的系列 
                            data:nums
                        }]
                    });

                }

            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                alert("ERROR:图表请求数据失败!");
                myChart.hideLoading();
            }
        })
};

function dayVisit(){
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近一周人流量统计',
            subtext: '苍耳统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'人次',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "DayVisit",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){
                    names.push(result[i].name);    //挨个取出类别并填入类别数组
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].value);    //挨个取出销量并填入销量数组
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '人次',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })
};
function monthVisit(){
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近一月人流量统计',
            subtext: '苍耳统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'人次',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "MonthVisit",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){
                    names.push(result[i].name);    //挨个取出类别并填入类别数组
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].value);    //挨个取出销量并填入销量数组
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '人次',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })
};
function yearVisit(){
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近一年人流量统计',
            subtext: '苍耳统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'人次',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）
    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "YearVisit",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){
                    names.push(result[i].name);    //挨个取出类别并填入类别数组
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].value);    //挨个取出销量并填入销量数组
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '人次',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })
};

function osStatistics(){
    myChart.clear();
    myChart.setOption({
        title : {
            text: '用户操作系统',
            subtext: '苍耳统计',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'用户操作系统',
                type:'pie',
                radius : '55%',
                center: ['55%', '60%'],
                data:[]
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   存放操作系统
    var nums=[];    //存放 操作系统,值

    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "OSStatistics",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                    nums.push({
                        name : result[i].name,   //键   操作系统
                        value : result[i].value,  //值   数量
                    });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                       data:names,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })


}

function activityLevel(){
    myChart.clear();
    myChart.setOption({
        title: {
            text: '周活跃时长统计',
            left: '苍耳统计',
            top: 20,
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'周活跃时长',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(1, 1,1, 1)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color:'rgba(1, 1,1, 1)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5bc0de',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   类目
    var nums=[];    //存放 类目-值

    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "activityLevel",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                        nums.push({
                            name : result[i].name,   //键   操作系统
                            value : result[i].value,  //值   数量
                        });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                        data:names,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums.sort(function (a, b) { return a.value - b.value; })
                    }],
                    visualMap:{
                        min:nums[0].value,
                        max:nums[nums.length-1].value*1.1,
                    }
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
        }
    })


}