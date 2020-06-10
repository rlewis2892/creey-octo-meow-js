import {Like} from "../interfaces/like";
import {connect} from "../../database";

export async function insertPost(like: Like) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "INSERT INTO `like`(likePostId, likeProfileId) VALUES(UUID_TO_BIN(:likePostId), UUID_TO_BIN(:likeProfileId))";

		const [rows] = await mySqlConnection.execute(mySqlQuery, like)
		return "Meow liked successfully! :D"

	} catch(error) {
		console.log(error)
	}
}