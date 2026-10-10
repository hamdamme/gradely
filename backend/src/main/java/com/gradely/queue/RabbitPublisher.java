package com.gradely.queue;

import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class RabbitPublisher {
    public static final String QUEUE="gradely.submissions";
    private final RabbitTemplate rabbit;
    private final RabbitAdmin admin;
    public RabbitPublisher(RabbitTemplate rabbit) { this.rabbit=rabbit; this.admin=new RabbitAdmin(rabbit); }
    public void publish(long id) {
        try {
            admin.declareQueue(new Queue(QUEUE,true));
            var props=new MessageProperties();
            props.setContentType("application/json"); props.setDeliveryMode(MessageDeliveryMode.PERSISTENT); props.setMessageId(Long.toString(id));
            var confirmation=new CorrelationData(java.util.UUID.randomUUID().toString());
            rabbit.send("",QUEUE,new Message(("{\"submissionId\":"+id+"}").getBytes(StandardCharsets.UTF_8),props),confirmation);
            var result=confirmation.getFuture().get(5,TimeUnit.SECONDS);
            if (!result.isAck() || confirmation.getReturned()!=null) throw new IllegalStateException("Message was not routed and confirmed");
        } catch (InterruptedException error) { Thread.currentThread().interrupt(); throw new IllegalStateException("Publish interrupted",error); }
        catch (Exception error) { throw new IllegalStateException("Queue publish failed",error); }
    }
}
