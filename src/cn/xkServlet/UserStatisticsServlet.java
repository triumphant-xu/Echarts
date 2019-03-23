package cn.xkServlet;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class UserStatisticsServlet extends HttpServlet {

        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            doPost(req, resp);
        }

        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            String uri=request.getRequestURI();
            if(uri.endsWith("UserDistribution")){
                userDistribution(request,response);
            }else if(uri.endsWith("OSStatistics")){
               osStatistics(request,response);
            }else if(uri.endsWith("activityLevel")){
                activityLevel(request,response);
            }
        }
     private void activityLevel(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
         List<Product> list = new ArrayList<Product>();

         //这里把“类别名称”和“销量”作为两个属性封装在一个Product类里，每个Product类的对象都可以看作是一个类别（X轴坐标值）与销量（Y轴坐标值）的集合
         list.add(new Product(">48h",300));
         list.add(new Product("24h~48h",600));
         list.add(new Product("12~24",600));
         list.add(new Product("8h~12h",800));
         list.add(new Product("2h~8h",500));
         list.add(new Product("1h~2h",500));
         list.add(new Product("<1h",600));

         ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
         String json = mapper.writeValueAsString(list);    //将list中的对象转换为Json格式的数组

         //将json数据返回给客户端
         response.setContentType("text/html; charset=utf-8");
         response.getWriter().write(json);
        }

        private void userDistribution(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
            List<Product> list = new ArrayList<Product>();

            //这里把“类别名称”和“销量”作为两个属性封装在一个Product类里，每个Product类的对象都可以看作是一个类别（X轴坐标值）与销量（Y轴坐标值）的集合
            list.add(new Product("北京",300));
            list.add(new Product("安徽",600));
            list.add(new Product("河南",600));
            list.add(new Product("江苏",800));
            list.add(new Product("江西",500));
            list.add(new Product("广东",600));
            System.out.println("加载用户分布");

            ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
            String json = mapper.writeValueAsString(list);    //将list中的对象转换为Json格式的数组

            //将json数据返回给客户端
            response.setContentType("text/html; charset=utf-8");
            response.getWriter().write(json);
        }
        private void osStatistics(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            List<Product> list = new ArrayList<Product>();

            //这里把“类别名称”和“销量”作为两个属性封装在一个Product类里，每个Product类的对象都可以看作是一个类别（X轴坐标值）与销量（Y轴坐标值）的集合
            list.add(new Product("win 7",3370));
            list.add(new Product("win 10",2300));
            list.add(new Product("win xp",1600));
            list.add(new Product("android",1800));
            list.add(new Product("ios",2500));
            list.add(new Product("linux",1600));


            ObjectMapper mapper = new ObjectMapper();    //提供java-json相互转换功能的类
            String json = mapper.writeValueAsString(list);    //将list中的对象转换为Json格式的数组

            //将json数据返回给客户端
            response.setContentType("text/html; charset=utf-8");
            response.getWriter().write(json);
        }
}
