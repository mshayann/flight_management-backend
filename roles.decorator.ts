
//custom @roles() decorator
import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/user.entity';


export const ROLES_KEY = 'roles';
//your decorator function. When you use @Roles('admin'), it calls SetMetadata and says “this route requires role: admin”.
//Later, you’ll write a Guard (like RolesGuard) that reads this metadata with Reflector and checks if the current user has one of the required roles.
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);   


//with ...roles, instead of only allowing one role, your decorator can take many.
// ... is a rest operator that allows multiple values and stores in the array.(roles in our case)