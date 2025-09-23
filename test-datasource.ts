// test-datasource.ts
import dataSource from './typeorm.config';


dataSource.initialize()
  .then(() => console.log("DataSource OK"))
  .catch(err => console.error("DataSource Error:", err));
