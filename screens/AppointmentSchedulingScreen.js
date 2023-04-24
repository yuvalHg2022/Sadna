import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import CustomBackButton from '../components/CustomBackButton';


export default function AppointmentSchedulingScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <CustomBackButton goBack={navigation.goBack} />
      <Header>זימון לראיון אישי</Header>
      <Paragraph>
        אנו נרגשים לקבל את הרשמתך לאפליקציית איגי וברצוננו לקבוע איתך ראיון אישי בזום עם אחד המדריכים בקבוצה.
       
        זה יאפשר לנו להבין טוב יותר את תחומי העניין שלך, ולתת לך הזדמנות ללמוד עלינו יותר.

        על מנת לתאם - נא להיכנס לקישור הבא ולקבוע בשעה שהכי נוחה לך.

        אנו מצפים לפגוש אותך!
        צוות ארגון איגי  
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'GoogleCalendarScreen' }],
          })
        }
      >
        המשך לקביעת ראיון אישי
      </Button>
    </Background>
  )
}