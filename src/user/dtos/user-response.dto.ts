// DTO for returning user data without password field
export class UserResponseDto {
    id: string; 
    email: string;  
    role: string;   
    createdAt: Date;    
    updatedAt: Date;  
}   