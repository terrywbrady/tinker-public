package org.cdlib.mrt.test;
import org.apache.logging.log4j.ThreadContext;
import org.apache.logging.log4j.message.Message;
import org.apache.logging.log4j.message.ObjectMessage;

import java.util.Map;
import java.util.TreeMap;

import org.apache.logging.log4j.LogManager;
import org.json.JSONArray;
import org.json.JSONObject;

public class Test {

    class MyLogObject implements Message {
        String s = "foo";
        int num = 111;
        String[] arr = {"a", "b"};
        JSONObject job = new JSONObject();

        public MyLogObject() {
                job.put("string", s);
                job.put("num", num);
                job.put(s, arr);
                System.out.println(job.toString(2));
        }

        @Override
        public String getFormattedMessage() {
                return job.toString();
        }

        @Override
        public String getFormat() {
                return null;
        }

        @Override
        public Object[] getParameters() {
                return null;
        }

        @Override
        public Throwable getThrowable() {
                return new Exception("hello");
        }

    }

    public static final void main(String[] argv) {
        new Test().test();
    }
    
    public void test() {
        System.out.println("Hello");
        ThreadContext.put("foo", "bar");
        ThreadContext.put("ding", "dong");
        LogManager.getLogger().info("Log Message");
        LogManager.getLogger().error("Log Error");
        Map<String, Object> map = new TreeMap<>();
        map.put("orig", "msg_origValue");
        map.put("source", 222);
        ObjectMessage msg = new ObjectMessage(map);        
        LogManager.getLogger().info(msg);
    }
}