import User from "../interface/user";
import * as moment from 'moment';

export const createUserTransaction = (user: User) => {
	return new Promise(async function (resolve, reject) {
		global.mysql.beginTransaction(async (err) => {
			console.log('Begin Transaciton')
			const personId = await createUserPerson(user);
			console.log('personId', personId)

			const userId = await createUser(parseInt(personId), user);
			console.log('userId', personId)

			const UserAccess = await createUserAccess(parseInt(userId), user)
			if (UserAccess == "created") {

				global.mysql.commit(function (err) {
					if (err) {
						return global.mysql.rollback(function () {
							throw err;
						});
					}
					user.isActive = true;
					user.person.idPerson = parseInt(personId)
					user.idUser = parseInt(userId)

					console.log('commited')

					resolve(user);
				})
			}
		})
	})
}

const createUserPerson = (user: User) => {
	return new Promise(async function (resolve, reject) {
		const insertPersonQuery = `INSERT INTO Person (name, birthdate ) values('${user.person.name}', ${user.person.birthdate})`

		global.mysql.query(insertPersonQuery, function (error, results, fields) {
			if (error) {
				return global.mysql.rollback(function () {
					throw error;
				});
			}
			resolve(results.insertId)

		})

	})
}

const createUser = (idPerson: number, user: User) => {
	return new Promise(async function (resolve, reject) {
		const insertUserQuery = `
	INSERT INTO User (username, email, password, isActive, createdAT, updatedAt, idPerson)
	values('${user.username}', '${user.email}', '${user.password}', 1, '${user.createdAt}', '${user.updatedAt}', ${idPerson})`

		global.mysql.query(insertUserQuery, function (error, results, fields) {
			if (error) {
				return global.mysql.rollback(function () {
					throw error;
				});
			}
			resolve(results.insertId)
		})
	})
}

const createUserAccess = (idUser: number, user: User) => {
	return new Promise(async function (resolve, reject) {

		const insertUserAccesQuery = `
	INSERT INTO UserAccess (idRole, idUser, isActive)
	values((SELECT idRoles from Roles Where name = '${user.roles.name}'),${idUser}, 1)`

		global.mysql.query(insertUserAccesQuery, function (error, results, fields) {
			if (error) {
				return global.mysql.rollback(function () {
					throw error;
				});
			}
			resolve("created")
		})

	})
}