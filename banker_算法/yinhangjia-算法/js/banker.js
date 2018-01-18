/**
 * Created by 宣棋 on 2017/10/30.
 */
var num_process; //记录进程数
var num_resource;//记录资源数
var max = new Array();//最大资源数 定义数组对象
var need = new Array();//资源需求数
var work = new Array();//资源可用数
var work2 = new Array();//用于记录每次进程调用的Work数
var available = new Array();//可利用资源数
var allocation = new Array();//已分配资源0

var request = new Array();//请求资源数
var finish = new Array();//是否已完成
var safe = new Array();//安全序列
var fg = false;    //更新Available标志
var o = 0;

//动态创建表格（第一个表格）
function CreateTable(){
    var tabletext = "";
    tabletext = "</br>系统资源的总数依次是：";
    for(i=0;i<num_resource;i++)
    {
        tabletext += " " + available[i] + "  ";
        //i=0 1 2分别代表进程ABC 然后显示在onClickOK中输入的available[i]的值
    }
    tabletext += "<p><p/><hr/>";
    tabletext += "请输入各个进程的最大需求数(Max)和已分配数(Allocation)</br>";
    tabletext += "<table border=1 cellspacing=1 width=80% style='text-align:center;border-collapse:collapse;border-width:thin;border-style:solid;margin:0;'><tr><td>资源</td><td colspan="+num_resource+">Max</td><td colspan="+num_resource+">Allocation</td colspan="+num_resource+"><td colspan="+num_resource+">Need</td colspan="+num_resource+"><td colspan="+num_resource+">Available</td></tr>";
    tabletext += "<tr>"+"<td>进程</td>";
    for(i=0;i<4;i++)
    //4代表Max Allocation Need Available
    {
        for(j=0;j<num_resource;j++)
        //j相当于第几个资源例如ABC
        {
            tabletext += "<td>"+String.fromCharCode((65+j))+"</td>";
            //String.fromCharCode 可以接受一个指定的Unicode值，然后返回一个字符串。
            //是String的静态方法，字符串中的每个字符都由单独的数字Unicode编码制定 A：65 B：66
        }
    }
    tabletext += "</tr>";
    for(i=0;i<num_process;i++)//进程数0-i
    {
        tabletext += "<tr><td>P"+i+"</td>";//P0-Pi
        for(j=0;j<4;j++) //4代表Max Allocation Need Available
        {
            for(x=0;x<num_resource;x++)//资源数ABC
            {
                tabletext += "<td class='numtd'><input type=text id=e"+i+j+x+" class= 'numtext'";//第i行j列下x列
                if(j==2||j==3)
                {
                    tabletext += " readonly=\"readonly\" "//如果在need available 无法输入
                }
                tabletext += "></td>";
            }
        }
        tabletext += "</tr>";
    }
    tabletext += "</table>";
    document.getElementById("d_table").innerHTML += tabletext;
    //getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。
}

//创建安全表格
function chickSafeTable(){
    var tabletext = "";
    tabletext = "<table border=1 cellspacing=1 width=80% style='text-align:center;border-collapse:collapse;border-width:thin;border-style:solid;margin:0;'><tr><td>资源</td><td colspan="+num_resource+">Work</td><td colspan="+num_resource+">Need</td colspan="+num_resource+"><td colspan="+num_resource+">Allocation</td colspan="+num_resource+"><td colspan="+num_resource+">Work+Allocation</td colspan="+num_resource+"><td>Finish</td></tr>";
    tabletext += "<tr>"+"<td>进程</td>";
    for(i=0;i<4;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            tabletext += "<td>"+String.fromCharCode((65+j))+"</td>";
            //String.fromCharCode 可以接受一个指定的Unicode值，然后返回一个字符串。
            //是String的静态方法，字符串中的每个字符都由单独的数字Unicode编码制定 A：65 B：66
        }
    }
    tabletext += "</tr>";
    for(i=0;i<num_process;i++)
    {
        tabletext += "<tr><td>P"+safe[i]+"</td>";
        for(j=0;j<5;j++)
        {
            for(x=0;x<num_resource;x++)
            {
                if(j==4&&x==0)
                {
                    tabletext += "<td id=t"+i+j+x+" class='outtable'></td>";
                    break;
                }
                else
                {
                    tabletext += "<td id=t"+i+j+x+" class='outtable'></td>";
                }
            }
        }
        tabletext += "</tr>";
    }
    tabletext += "</table>";
    document.getElementById("output2").innerHTML += tabletext;
    //getElementById() 方法可返回对拥有指定 ID 的第一个对象的引
    // 用。innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。
    updataOfSafeList();
}

//更新安全表格（第二个表格）
function updataOfSafeList(){
    //Work
    for(i=0;i<num_process;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            document.getElementById("t"+i+"0"+j).innerHTML = work2[i][j];
        }
    }
    //Need
    for(i=0;i<num_process;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            document.getElementById("t"+i+"1"+j).innerHTML = need[parseInt(safe[i])][j];
        }
    }
    //Allocation
    for(i=0;i<num_process;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            document.getElementById("t"+i+"2"+j).innerHTML = allocation[parseInt(safe[i])][j];
        }
    }
    //Work+Allocation
    for(i=0;i<num_process;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            document.getElementById("t"+i+"3"+j).innerHTML = work2[i][j]+allocation[safe[i]][j];
        }
    }
    //Finish
    for(i=0;i<num_process;i++)
    {
        document.getElementById("t"+i+"4"+"0").innerHTML = finish[safe[i]];
    }
}

//点击第一个按钮
function onClickOK(){
    document.getElementById("input").style.display = "none";
    num_process = parseInt(document.getElementById("t_process").value);
    //pasrseInt内置函数（把字符串解析成整数） value(获得该id的值)
    num_resource = parseInt(document.getElementById("t_resource").value);
    ChickNull(num_process,"请输入进程数:");
    ChickNull(num_resource,"请输入资源数:");
    if(isNaN(num_process&&num_resource))
    {
        alert("请输入数字！");
        return;
    }
    alert(num_process+"个进程"+num_resource+"个资源");
    //弹出对话框显示几个进程几个资源
    for(i=0;i<num_resource;i++)
    {
        available[i] = window.prompt("第"+(i+1)+"个资源总数：");
        //输入各个资源的资源总数 available
        ChickNull(available[i],"请输入资源总数:");//检查输入是否为空 如果没有输入数据会弹出请输入资源总数
        if(isNaN(available[i]))
        {
            alert("请输入数字！");
            return;
        }
    }
    CreateTable();
    document.getElementById("d_display").style.display = "";
    //执行完第一个按钮的函数onClickOK后显示第一个表格
}

//点击第二个按钮
function onClickOK2()
{
    GetInfo();//获得填充数据函数
    ChickSequence();//获得安全序列函数
    PrintSequence("outputlist");//输出安全序列函数并且在ID为outputlist的DIV上显示
}

//获得填充数据
function GetInfo()
{
    //获取最大资源数
    for(i=0;i<num_process;i++)//从P0进程开始
    {
        max[i]=new Array();//等于一开始定义的数组对象
        for(j=0;j<num_resource;j++)//从第一个资源开始
        {
            max[i][j]=parseInt(document.getElementById("e"+i+"0"+j).value);
            //pasrseInt内置函数（把字符串解析成整数） value(获得该id的值（输入的第I行j列的Max值）)
            ChickNull(max[i][j],"请输入最大资源数:");
            if(isNaN(max[i][j]))
            {
                alert("请输入数字！");
                return;
            }
        }
    }

    //获取已分配资源数
    for(i=0;i<num_process;i++)
    {
        allocation[i]=new Array();
        for(j=0;j<num_resource;j++)
        {
            allocation[i][j]=parseInt(document.getElementById("e"+i+"1"+j).value);
            ChickNull(allocation[i][j],"请输入已分配资源数:");//同上
            if(isNaN(allocation[i][j]))
            {
                alert("请输入数字！");
                return;
            }
        }
    }
}

//得到并填充Need
function GetNeed()
{
    //计算各进程对个资源的需求量
    for(i = 0; i < num_process; i ++)
    {
        need[i]=new Array();
        for(j = 0; j < num_resource; j ++)
        {
            need[i][j] = max[i][j] - allocation[i][j];
        }
    }
    //填充Need
    for(i=0;i<num_process;i++)
    {
        for(j=0;j<num_resource;j++)
        {
            document.getElementById("e"+i+"2"+j).value = need[i][j];
            //传到ID是e的那个表格下 need的值
        }
    }
}

//得到Work
function GetWork()
{
    for(j=0;j<num_resource;j++)
    {
        work[j]=available[j];
    }
}

//得到并填充Available
function GetAvailable(fg)
{
    //计算Available
    if(!fg) //判断不是有效值
    {
        for(i=0;i<num_resource;i++)
        {
            for(j=0;j<num_process;j++)
            {
                available[i] -= allocation[j][i];//计算可用资源数 用最大可用资源数减已分配资源数循环
                if(available[i]<0)
                {
                    alert("请求失败！无可利用资源");
                    return false;
                }
            }
        }
    }
    else
    {
        if(available[i]<0)
        {
            alert("请求失败！无可利用资源");
            return false;
        }
        else
        {}
    }
    //填充Available
    for(i=0;i<num_resource;i++)
    {
        document.getElementById("e"+0+"3"+i).value = available[i];
        //将available值传到ID为e第3列的表格中
    }
    return true;
}

//新请求资源
function Banker()
{
    fg = true;
    var v1 = parseInt(window.prompt("请输入第几个进程请求资源"));
    //pasrseInt内置函数（把字符串解析成整数）window.prompt弹出窗口
    for(i=0;i<num_process;i++)
    {
        request[i] = new Array(); //进程i满足条件后给其定义为数组对象
    }
    for(j=0;j<num_resource;j++)
    {
        request[v1-1][j] = window.prompt("进程P"+(v1-1)+"请求资源"+String.fromCharCode((65+j))+"数量：");
        //v1-1是第v1的进程 P(v1-1)
        ChickNull(request[v1-1][j],"请输入进程所请求资源数:");//判断是否为空
        if(isNaN(request[v1-1][j]))//判断是否输入的是否为数字
        {
            alert("请输入数字！");
            return;
        }
    }
    for(j=0;j<num_resource;j++)
    {
        if(request[v1-1][j]>need[v1-1][j])//判断清用资源数是否大于需求
        {
            alert("请求资源数大于所需最大值，失败！");
            return;
        }

        else if(request[v1-1][j]>available[j])//判断请用资源数是否大于可用的
        {
            alert("请求资源数大于可利用资源量，请等待！");
            return;
        }
        //（request<=need&&request<=available）
        else
        {
            available[j] -= request[v1-1][j];//available-request
            var v2 = parseInt(allocation[v1-1][j]);//把字符串转换为整数
            var v3 = parseInt(request[v1-1][j]);
            allocation[v1-1][j] = v2+v3;//allocation=allocation+request
            need[v1-1][j] -= request[v1-1][j];//need-request
        }
    }
    ChickSequence(); //调用获得安全序列函数
    PrintSequence("output2");//调用输出安全序列函数并且在ID为output2的DIV上显示
}

//获得安全序列
function ChickSequence()
{
    GetNeed();
    GetAvailable(fg);
    GetWork();
    //初始化work2
    for(i=0;i<(num_process+1);i++)
    {
        work2[i] = new Array();
    }
    for(i=0;i<num_resource;i++)
    {
        work2[0][i] = work[i];
    }
    //初始化finish
    for(i=0;i<num_process;i++)
    {
        finish[i] = false;
    }
    o = 0;
    //算法核心！！！
    while(o < num_process)
    {
        flag = false;//下列两个都不满足时
        for(i = 0; i < num_process; i ++)
        {
            if(finish[i])//判断finish[i]=false是否有效，直到有效结束本次循环
                continue;
            for( j = 0; j < num_resource; j ++)
            {
                if(need[i][j] > work[j])//如果need>work直接结束本次循环
                    break;
            }
            //满足finish[i]=false,need<work后
            if(j == num_resource)
            {
                flag = true;//表示满足上两个条件
                safe[o] = i;//第几个安全序列
                o++;
                finish[i] = true;//当所有的safe[0]的finish[i]都为true时
                for(k = 0; k < num_resource; k ++)
                {
                    work[k] += allocation[i][k];//work+allocation
                    work2[o][k] = work[k];
                }
            }
        }
        if(!flag)
            break;
    }
}

//输出安全序列
function PrintSequence(id)
{
    if(o == num_process)
    {
        html="<hr/>该资源是安全的;安全序列为:";
        for(i=0;i<o;i ++)
        {
            html+="P"+safe[i];//P1->P3->P4...
            if(i<o-1)
                html+="->";
        }
    }
    else
    {
        html="<hr/>对不起，该资源状态不安全！";
        document.getElementById(id).innerHTML = html;
        //getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。
        return;
    }
    document.getElementById(id).innerHTML = html;
    //getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。
    chickSafeTable();
}

//判断输入是否为空
function ChickNull(text,warning)
{
    if(text.length==0)
    {
        alert(warning);
        return false;
    }
    else if (/\s/.test(text))
    {
        alert("输入不能为空格!");
        return false;
    }
    return true;
}