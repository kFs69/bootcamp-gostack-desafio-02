import Students from '../models/Students';

class StudentController {
  async store(req, res) {
    const { name, email, age, weight, height } = req.body;

    const emailExists = await Students.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await Students.create({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(user);
  }
}

export default new StudentController();
