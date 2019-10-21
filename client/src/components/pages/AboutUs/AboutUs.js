import React, { Component } from 'react';
import './AboutUs.scss';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

export class AboutUs extends Component {
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="md" className="container">
          <Card className="about-card">
            <CardContent>
              <div className="about-header">
                <Typography variant="h5">Про Освітня карту</Typography>
              </div>
              <Typography className="about-text">
                Платформа <b><em>Освітня карта</em></b> створена для учнів установ середньої освіти, а також для 
                їх батьків, вчителів та представників адміністрації установ. Даний сервіс надає інформацію про 
                кількість зарахованих дітей до першого класу в кожній конкретній школі а також спрощує подання
                документів для зарахування дитини до першого класу. В нас Ви можете дізнатися про поточний рейтинг
                шкіл, <Link to="/search" className="about-link">розташування</Link> та віддаленість школи від Вашого 
                дому а також почитати відгуки про школу або останні <Link to="/news" className="about-link">
                новини</Link>.
              </Typography>
              <div className="about-header">
                <Typography variant="h5">Рейтинги шкіл</Typography>
              </div>
              <Typography className="about-text">
                <b><em>Освітня карта </em></b> надає інформацію про рейтинг шкіл на основі середнього балу всіх
                випускників закладу освіти після проходження зовнішного незалежного оцінювання (ЗНО). Окрім рейтингу
                за успішністю учнів, надається інформація про рейтинг за відгуками школи, де береться до уваги не 
                тільки бали ЗНО випускників школи, а також поточний стан навчального закладу, розташування,
                кваліфікації вчителів, наявність сучасного обладнанняю та інше.
              </Typography>
              <div className="about-header">
                <Typography variant="h5">Подання до першого класу</Typography>
              </div>
              <Typography className="about-text">
                В нас Ви можете дізнатися про кількість зареєстрованих майбутніх першокласників в тій чи іншій школі,
                а також порядковий номер учня в черзі. <b><em>Освітня карта </em></b> надає можливість подавати заяву та
                всі необхідні документи не виходячи з дому, що значно спрощує процес зарахування дитини до школи. Для 
                подання документів, все що необхідно, це просто відправити листа в адміністрацію школи зі всіма
                прикріпленими документами.
              </Typography>
              <div className="about-header">
                <Typography variant="h5">Пошук школи</Typography>
              </div>
              <Typography className="about-text">
                При переході за посиланням <Link to="/search" className="about-link">Знайти школи</Link> Ви зможете 
                шукати школу яка найбільш підходить Вам по тим чи іншим показникам. Зокрема <b><em>Освітня карта </em></b>
                допомагає підібрати школу при указанні Вашої поточної адреси проживання, та дає змогу вибрати 
                установу cередньої освіти по рейтингу ЗНО, відгуках або спеціалізації в іноземній мові. Також 
                користувач має змогу шукати школу по кількості місць у перший клас.
              </Typography>
              <div className="about-header">
                <Typography variant="h5">Вакансії та новини</Typography>
              </div>
              <Typography className="about-text">
                На даному сайті присутній <Link to="/vacancies" className="about-link">Перелік вакантних місць </Link> 
                для вчителів з усіх закладів середньої освіти. При реєстрації користувач має змогу відправити своє 
                резюме на вибрану вакансію. На <b><em>Освітній карті </em></b>Ви зможете дізнатися про <Link to="/news" 
                className="about-link">Останні новини</Link> з шкільного життя, котрі можуть бути цікавими, не тільки
                учням і представникам шкільної адміністрації, а й усім охочим.
              </Typography>
            </CardContent>
          </Card>
        </Container>
    </React.Fragment>  
    )
  }
}

export default AboutUs
