package cn.xkServlet;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class VisitServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uri=request.getRequestURI();
        if(uri.endsWith("DayVisit")){
               dayVisit(request,response);
        }else if(uri.endsWith("MonthVisit")){
            monthVisit(request,response);
        }else if(uri.endsWith("YearVisit")){
            yearVisit(request,response);
        }else if(uri.endsWith("HourVisit")){
            hourVisit(request,response);
        }

    }

    private void dayVisit(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException{

        List<Product> list = new ArrayList<Product>();

        Calendar cal = Calendar.getInstance();//此时打印它获取的是系统当前时间
        String day;
        cal.add(Calendar.DATE, -7);
        for(int i=0;i<7; i++){
            cal.add(Calendar.DATE, +1); //得到前一天
            day = new SimpleDateFormat("yyyy.MM.dd").format(cal.getTime());
            list.add(new Product(day,(i*i)%400));
        }




        ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
        String json = null;    //将list中的对象转换为Json格式的数组
        json = mapper.writeValueAsString(list);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(json);

    }
    private void monthVisit(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Product> list = new ArrayList<Product>();

        Calendar cal = Calendar.getInstance();//此时打印它获取的是系统当前时间
        String day;
        cal.add(Calendar.DATE, -30);
        for(int i=0;i<30; i++){
            cal.add(Calendar.DATE, +1); //得到前一天
            day = new SimpleDateFormat("yyyy.MM.dd").format(cal.getTime());
            list.add(new Product(day,(i*i)%400));
        }




        ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
        String json = null;    //将list中的对象转换为Json格式的数组
        json = mapper.writeValueAsString(list);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(json);

    }
    private void yearVisit(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Product> list = new ArrayList<Product>();

        Calendar cal = Calendar.getInstance();//此时打印它获取的是系统当前时间
        String day;
        cal.add(Calendar.DATE, -365);
        for(int i=0;i<363; i++){
            cal.add(Calendar.DATE, +1); //得到前一天
            day = new SimpleDateFormat("yyyy.MM.dd").format(cal.getTime());
            list.add(new Product(day,(i*i)%400));
        }




        ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
        String json = null;    //将list中的对象转换为Json格式的数组
        json = mapper.writeValueAsString(list);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(json);
    }



    private void hourVisit (HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Product> list = new ArrayList<Product>();
        for(int i=0;i<24; i++){
            list.add(new Product(i+"",(i*i)%26));
        }





        ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
        String json = null;    //将list中的对象转换为Json格式的数组
        json = mapper.writeValueAsString(list);
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().write(json);

    }
}