import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.black};
  text-align: center;
  margin-bottom: 20px;
`;

const TutorialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TutorialCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 1px 6px 20px 5px ${({ theme }) => theme.primary + 15};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 0.3;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const TutorialTitle = styled.h3`
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 2;
`;
const About = styled.p`
 font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;

`
;

const tutorials = [
  {
    title: "Best Exercises for a Full-Body Workout",
    description: "Learn how to perform a full-body workout that targets all major muscle groups. This tutorial includes exercises like squats, deadlifts, and push-ups.",
    about:"1.Warm up with basics.\n 2.Walking is simple, yet powerful. It can help you stay trim, improve cholesterol levels, strengthen bones.\n 3.Bodyweight exercises, such as push-ups, squats, and lunges, are a great way to improve overall fitness and build muscle without the need for any equipment.\n 4.Outdoor activities, such as hiking, rock climbing, and kayaking, are a great way to improve overall health and fitness. These types of activities can also be a fun way to mix up your workout routine.\n 5.HIIT workouts involve short bursts of intense activity followed by periods of rest. These types of workouts are great for improving cardiovascular health and burning calories.",
    image: "https://pixahive.com/wp-content/uploads/2020/08/Young-attractive-woman-does-yoga-exercise-in-the-gym-23066-pixahive.jpg/150",
  },
  {
    title: "The Ultimate Guide to Healthy Eating",
    description: "Discover the fundamentals of healthy eating, including tips on meal planning, portion control, and choosing nutrient-dense foods.",
    about:"Healthy eating emphasizes fruits, vegetables, whole grains, dairy, and protein. Dairy recommendations include low-fat or fat-free milk, lactose-free milk, and fortified soy beverages. Other plant-based beverages do not have the same nutritional properties as animal’s milk and soy beverages. Protein recommendations include seafood, lean meats and poultry, eggs, legumes (beans, peas, and lentils), soy products, nuts, and seeds. At the same time, we need to consume less added sugar, saturated fat, and sodium.",
    image: "https://oxfordshireguardian.co.uk/wp-content/uploads/2023/07/eating-healthy-food.jpg",
  },
  {
    title: "Yoga for Beginners: Basic Poses and Tips",
    description: "Start your yoga journey with this beginner's guide. Learn basic poses, breathing techniques, and how to create a consistent practice.",
    about:"1.Find a good Yoga teacher.\n 2.Respect your body's inner wisdom and limitations.\n 3.Yoga is all about healthy breathing; try to breathe with whole body and try to maintain proper poses.\n 4.It is advisable not to eat for one or two hours before yoga practice.\n 5.Humility, an inner smile and a bit of gentleness can save us from pushing ourselves to the point of strain and injury.\n 6.Try to wear loose and comfortable clothes during yoga, so that you can stretch your body in any direction.\n 7.Finish your practice with Shavasana, ‘Corpse pose’, lying flat on the floor, resting and consciously relaxing your body for five to 15 minutes. ",
    image: "https://images.unsplash.com/photo-1552286450-4a669f880062?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D",
  },
  {
    title: "Zumba: dance workout to refresh mind",
    description: "Zumba is a most well-known and popular Latin dance program. Let's take a look about Zumba and it's working process.",
    about:"Zumba is one of the best-known fitness organizations in the world, with more than 200,000 class locations available in 180 countries. And while the brand is best known for its signature Zumba Latin dance fitness class.\nEach workout involves highly choreographed movements set to upbeat salsa and international music. Essentially, Zumba is a fun, high-energy workout experience that keeps you excited to exercise and return for more.These are typically offered at gyms and fitness centers, although Zumba instructors are welcome to market classes on their own, hosting workouts at parks, schools, or other venues.",
    image: "https://www.choreonconcept.com/wp-content/uploads/2021/04/Zumba-Dance-Workout.jpg",
  },
  {
    title: "Meditation: The artistic way to control your mind",
    description: "Let's take a long breathe and sit down with a peaceful manner and remove all the external thoughts from the mind.",
    about:"When we meditate, we inject far-reaching and long-lasting benefits into our lives: We lower our stress levels, we get to know our pain, we connect better, we improve our focus, and we're kinder to ourselves.Sometimes, that’s all we need to make better choices for ourselves, our families, and our communities. And the most important tools you can bring with you to your meditation practice are a little patience, some kindness for yourself, and a comfortable place to sit.Meditation is the way where we can built a peaceful connection between our body and soul.",
    image: "https://images.squarespace-cdn.com/content/v1/5d31ed671abe780001b2964d/1629246128458-UOWBI7EKRAQ7ZMDOHI79/DW_TheBreathSequence-4.jpg",
  },
];

const Tutorials = () => {
  return (
    <Container>
      <Title>Let's lead a healthy life 💪</Title>
      <TutorialList>
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index}>
            <ImageWrapper>
              <img src={tutorial.image} alt={tutorial.title} />
            </ImageWrapper>
            <Content>
              <TutorialTitle>{tutorial.title}</TutorialTitle>
              <Description>{tutorial.description}</Description>
              <About>{tutorial.about}</About>
            </Content>
          </TutorialCard>
        ))}
      </TutorialList>
    </Container>
  );
};

export default Tutorials;
