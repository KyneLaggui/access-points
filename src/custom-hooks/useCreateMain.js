import { supabase } from "../supabase/config";

const useCreateMain = async (newMainData) => {
  try {
    const { data, error } = await supabase
      .from("main")
      .select("*")
      .eq("id", newMainData.id) // Check if the record already exists
      .single();

    if (data) {
      // If data exists, update the record
      const { error: updateError } = await supabase
        .from("main")
        .update(newMainData)
        .eq("id", newMainData.id);

      if (updateError) throw updateError;
      alert("Successfully updated the player");
    } else {
      // If no data exists, insert new record
      const { error: insertError } = await supabase
        .from("main")
        .insert(newMainData);

      if (insertError) throw insertError;
      alert("Successfully added the player");
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred while saving the player");
  }
};

export default useCreateMain;
