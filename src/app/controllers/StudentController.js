import * as Yup from 'yup';
import Students from '../models/Students';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const user = await Students.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await Students.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    const { name, age, weight, height } = await user.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
