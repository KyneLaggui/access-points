import { supabase } from "../supabase/config";

const useCreateMain = async (newMainData) => {
  const { data, error } = await supabase.from("main").insert(newMainData);

  if (!error) {
    // const allVouchers = data.map((voucher) => {
    //   return {
    //     ...voucher,
    //   };
    // });

    // setVouchers(allVouchers);
    alert("Successfully Added");
  } else {
    console.log(error);
  }
};

export default useCreateMain;
