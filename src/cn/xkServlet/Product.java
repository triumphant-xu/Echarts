package cn.xkServlet;

    public class Product {

        private String name;    //键
        private int value;        //值

        public Product(String name, int values) {
            this.name = name;
            this.value = values;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int num) {
            this.value = value;
        }
    }

