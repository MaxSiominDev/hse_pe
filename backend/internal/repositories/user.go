package repositories

import (
	"context"
	"database/sql"
	"hse_school/internal/domain"
)

// Реализация репозитория
type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetUserByID(ctx context.Context, id int) (*domain.User, error) {
	user := &domain.User{}
	err := r.db.QueryRow("SELECT id, name, email FROM users WHERE id = $1", id).
		Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) CreateUser(ctx context.Context, user *domain.User) error {
	_, err := r.db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", user.Name, user.Email)
	return err
}
