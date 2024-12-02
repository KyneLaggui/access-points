import { supabase } from "../supabase/config";

const useCreateTeam = async (teamData, teamPlayers) => {
  try {
    // Insert into "main" table
    const { data: mainData, error: mainError } = await supabase
      .from("main")
      .insert({
        team_name: teamData.team_name,
        section_team: teamData.section_team,
        game: teamData.game,
        points: teamData.points,
      });

    if (mainError) throw mainError;

    // Insert players into "team_players" table
    const playerData = teamPlayers.map((player) => ({
      team_name: teamData.team_name,
      player_name: player,
    }));

    const { data: playerResponse, error: playerError } = await supabase
      .from("team_players")
      .insert(playerData);

    if (playerError) throw playerError;

    alert("Team and players successfully registered!");
  } catch (error) {
    console.error("Error registering team:", error);
    alert("An error occurred while registering the team.");
  }
};

export default useCreateTeam;
