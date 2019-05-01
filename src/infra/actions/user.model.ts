import User from "../interface/user";
import * as moment from 'moment';

export const createUserTransaction = (user: User) => {
	global.mysql.beginTransaction(function (err) {
		const insertPersonQuery = `INSERT INTO Person (name, birthdate ) values('${user.person.name}', ${user.person.birthdate})`

		global.mysql.query(insertPersonQuery, function (error, results, fields) {
			if (error) {
				return global.mysql.rollback(function () {
					throw error;
				});
			}

			const idPerson = results.insertId;

			const insertUserQuery = `
            INSERT INTO User (username, email, password, isActive, createdAT, updatedAt, idPerson)
            values(${user.username}, ${user.email}, ${user.password}, 1, ${user.createdAt}, ${user.updatedAt}, ${idPerson});
            `

			global.mysql.query(insertUserQuery, function (error, results, fields) {
				if (error) {
					return global.mysql.rollback(function () {
						throw error;
					});
				}

				const idUser = results.insertId;

				const insertUserAccesQuery = `
                INSERT INTO UserAccess (idRole, idUser, isActive)
                values((SELECT idRoles from Roles Where name = ${user.roles.name}),${idUser}, 1)
                `
				global.mysql.query(insertUserAccesQuery, function (error, results, fields) {
					if (error) {
						return global.mysql.rollback(function () {
							throw error;
						});
					}

					global.mysql.commit(function (err) {
						if (err) {
							return global.mysql.rollback(function () {
								throw err;
							});
						}


						console.log('success!');
					});


				})
			})
		})

	})

}

const createUserPerson = (user: User) => {
	const insertPersonQuery = `INSERT INTO Person (name, birthdate ) values('${user.person.name}', ${user.person.birthdate})`

	global.mysql.query(insertPersonQuery, function (error, results, fields) {
		if (error) {
			return global.mysql.rollback(function () {
				throw error;
			});
		}
		
	})
}

const createUser = (idPerson: number,  user: User) => {

	const insertUserQuery = `
	INSERT INTO User (username, email, password, isActive, createdAT, updatedAt, idPerson)
	values(${user.username}, ${user.email}, ${user.password}, 1, ${user.createdAt}, ${user.updatedAt}, ${idPerson})`

	global.mysql.query(insertUserQuery, function (error, results, fields) {
		if (error) {
			return global.mysql.rollback(function () {
				throw error;
			});
		}
		 
	})
}

const createUserAccess = (idUser: number,  user: User) => {

	const insertUserAccesQuery = `
	INSERT INTO UserAccess (idRole, idUser, isActive)
	values((SELECT idRoles from Roles Where name = ${user.roles.name}),${idUser}, 1)`

	global.mysql.query(insertUserAccesQuery, function (error, results, fields) {
		if (error) {
			return global.mysql.rollback(function () {
				throw error;
			});
		}
		 
	})
}