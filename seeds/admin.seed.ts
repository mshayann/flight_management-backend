// src/seeds/admin.seed.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from 'src/users/user.entity';

export async function seedAdmin(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const existingAdmin = await userRepo.findOneBy({ role: UserRole.ADMIN });
  if (existingAdmin) return;

  const admin = userRepo.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: await bcrypt.hash('admin123', 10),
    role: UserRole.ADMIN,
  });

  await userRepo.save(admin);
  
}
