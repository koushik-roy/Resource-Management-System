import ProjectSkillApi from "../apis/ProjectSkillApi";

const submitProjectSkill = async (data, project_id) => {
  await ProjectSkillApi.post(
    "/",
    {
      params: {
        skill_id: { project_id },
      },
    },
    data
  ).then((res) => {
    console.log("success");
  });
};

export const projectSkillService = {
  submitProjectSkill,
};
