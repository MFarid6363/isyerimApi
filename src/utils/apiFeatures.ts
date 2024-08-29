// export class APIFeatures {
//   query;
//   queryString;

//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortby = this.queryString.sort.split(',').join(' ');
//       this.query = this.query.sort(sortby);
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }
//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }
//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit);
//     // if (this.queryString.page) {
//     //   const numTours = await this.query.countDocuments();
//     //   if (skip >= numTours) throw new Error('This page does not exist');
//     // }
//     return this;
//   }
// }

// export default APIFeatures;
