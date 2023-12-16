import homePageRoute from './home.route.js';
import authRoute from './auth.route.js';
import sectionOneRoute from './section.one.route.js';
import sectionTwoRoute from './section.two.route.js';
import sectionPageRoute from './experience.route.js';

export default (app) => { 
  app.use('/api/v1/home-page', homePageRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/section-one', sectionOneRoute);
  app.use('/api/v1/section-two', sectionTwoRoute);
  app.use('/api/v1/experience-page', sectionPageRoute);
}